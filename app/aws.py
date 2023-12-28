import boto3
import os
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


def generate_unique_filename(original_filename):
    current_datetime = datetime.now().strftime('%Y%m%d%H%M%S')
    unique_id = str(uuid.uuid4())
    return f"{current_datetime}_{unique_id}_{original_filename}"


def upload_to_s3(file):
    try:
        filename = generate_unique_filename(file.filename)

        s3.upload_file(file, bucket, filename)

        s3_image_url = f"https://{bucket}.s3-{s3.meta.region_name}.amazonaws.com/{filename}"

        return s3_image_url

    except Exception as e:
        print(f"Error uploading to S3: {e}")
        return None
