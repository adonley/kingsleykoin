#!/bin/bash
# \curl -sSL https://raw.githubusercontent.com/codeship/scripts/master/deployments/aws_s3.sh | bash -s
AWS_ACCESS_KEY_ID=${AWS_ACCESS_KEY_ID:?'You need to configure the AWS_ACCESS_KEY_ID environment variable!'}
AWS_SECRET_ACCESS_KEY=${AWS_SECRET_ACCESS_KEY:?'You need to configure the AWS_SECRET_ACCESS_KEY environment variable!'}
AWS_DEFAULT_REGION="us-east-1"
AWS_S3_BUCKET=${AWS_S3_BUCKET:?'You need to configure the AWS_SECRET_ACCESS_KEY environment variable!'}
LOCAL_PATH="dist"
AWS_DELETE_FLAG="1"

# Fail the deployment on the first error
set -e

declare -A AWS_S3_EXTRA_ARGS=()

AWS_S3_EXTRA_ARGS["content-encoding"]=${AWS_S3_CONTENT_ENCODING} # Sets Content-Encoding Header
AWS_S3_EXTRA_ARGS["cache-control"]=${AWS_S3_CACHE_CONTROL} # Sets Cache-Control Header
AWS_S3_EXTRA_ARGS["acl"]=${AWS_S3_ACL} # Sets ACL


# Base command to be executed
BASE_COMMAND="aws s3 sync ${LOCAL_PATH} s3://${AWS_S3_BUCKET}/"

# Build command with arguments that are provided and not empty
for key in "${!AWS_S3_EXTRA_ARGS[@]}"
do
  if [ -n "${AWS_S3_EXTRA_ARGS[$key]}" ]; then # Checks if not empty
    echo "Detected AWS_S3 Argument: $key=\"${AWS_S3_EXTRA_ARGS[$key]}\""
    BASE_COMMAND+=" --$key=\"${AWS_S3_EXTRA_ARGS[$key]}\""
  fi
done

# Check for delete flag
if [ -n "${AWS_S3_DELETE_FLAG}" ]; then
	BASE_COMMAND+=" --delete"
fi

# Is eval unsafe ?
eval "${BASE_COMMAND}"
