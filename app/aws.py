import boto3
from io import BytesIO
import os
import base64
from dotenv import load_dotenv
from datetime import datetime
import uuid

load_dotenv()

AWS_ACCESS_KEY_ID = os.getenv("AWS_ACCESS_KEY_ID")
AWS_SECRET_ACCESS_KEY = os.getenv("AWS_SECRET_ACCESS_KEY")

s3 = boto3.client(
    's3',
    aws_access_key_id=AWS_ACCESS_KEY_ID,
    aws_secret_access_key=AWS_SECRET_ACCESS_KEY,
    region_name='us-east-1'
)

bucket = 'littlestridesbucket'


def generate_unique_filename(ext):
    current_datetime = datetime.now().strftime('%Y%m%d%H%M%S')
    unique_id = str(uuid.uuid4())
    return f"{current_datetime}_{unique_id}.{ext}"


# def upload_to_s3(file):
# def upload_to_s3(blob_data):
def upload_to_s3(base64_thing):
    print("in upload to s3 function")
    # print("file:", file)
    # print("blob aka file:", blob_data)
    try:

        base64_image = base64_thing.split(",")[1]
        image_data = base64.b64decode(base64_image)

        parts = base64_thing.split(";")
        # Take the second part, which contains the MIME type
        mime_type = parts[0].split(":")[1]
        # Extract the file extension from the MIME type
        extension = mime_type.split("/")[1]
        filename = generate_unique_filename(extension)

        # blob_data_bytes = blob_data.encode('utf-8')
        # s3.upload_file(file, bucket, filename)
        # s3.upload_fileobj(BytesIO(blob_data_bytes), bucket, filename)
        s3.upload_fileobj(BytesIO(image_data),
                          bucket, filename,
                          ExtraArgs={'ContentType': mime_type})

        s3_image_url = f"https://{bucket}.s3.amazonaws.com/{filename}"
        # s3_image_url = f"https://{bucket}.s3-{s3.meta.region_name}.amazonaws.com/{filename}"

        return s3_image_url

    except Exception as e:
        print(f"Error uploading to S3: {e}")
        return None
