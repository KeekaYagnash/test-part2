provider "aws" {
  region = "us-east-1"
}
# S3 Bucket
data "aws_s3_bucket" "vector_bucket" {
  bucket = "ai-shop-vector-files-store"
}

# Lambda Role
resource "aws_iam_role" "lambda_role" {
  name = "ai-shop-execution-role-lambda"
  tags = {
    name        = "ai-shop-s3-execution-lambda-role"
    owner       = "Disraptor"
    environment = "prod"
    service     = "S3 bucket"
    type        = "application"
  }

  assume_role_policy = jsonencode({
    Version = "2012-10-17",
    Statement = [{
      Action = "sts:AssumeRole",
      Effect = "Allow",
      Principal = {
        Service = "lambda.amazonaws.com"
      }
    }]
  })
}

# S3 Bucket for lambda code
resource "aws_s3_bucket" "load-path-and-userid_upload" {
  bucket = "lambda-upload-code-load-path-and-userid"
  tags = {
    Name        = "prod-ai-shop-lambda-code-for-load-path-and-userid",
    owner       = "disraptor",
    environment = "prod",
    service     = "AI-Shop",
    type        = "application"
  }
}

resource "aws_s3_bucket_public_access_block" "s3_lambda_bucket_access" {
  bucket                  = aws_s3_bucket.load-path-and-userid_upload.id
  block_public_acls       = false
  block_public_policy     = false
  ignore_public_acls      = false
  restrict_public_buckets = true
}

resource "aws_s3_bucket_versioning" "prompt_bucket_versioning" {
  bucket = aws_s3_bucket.load-path-and-userid_upload.id
  versioning_configuration {
    status = "Enabled"
  }
}

# resource "aws_s3_bucket_object" "object_upload2" {
#   bucket = aws_s3_bucket.load-path-and-userid_upload.bucket
#   key    = "lambda_function.zip"
#   source = "./lambda/lambda_function.zip"
# }

resource "aws_s3_bucket_policy" "prompt_bucket_policy" {
  bucket = aws_s3_bucket.load-path-and-userid_upload.bucket
  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Effect = "Allow"
        Principal = {
          Service = "lambda.amazonaws.com"
        }
        Action   = "s3:GetObject"
        Resource = "${aws_s3_bucket_object.object_upload2.arn}"
      }
    ]
  })
}

#######################

# Lambda Function
resource "aws_lambda_function" "lambda_code" {
  tags = {
    name        = "ai-shop-s3-load-path-and-userid-function"
    owner       = "Disraptor"
    environment = "prod"
    service     = "S3 bucket"
    type        = "application"
  }
  # filename         = "./lambda/lambda_function.zip"
  s3_bucket        = aws_s3_bucket.load-path-and-userid_upload.bucket
  s3_key           = aws_s3_bucket_object.object_upload2.key
  function_name    = "s3-load-path-and-userid-function"
  role             = aws_iam_role.lambda_role.arn
  handler          = "lambda_function.lambda_handler"
  runtime          = "python3.12"
  source_code_hash = filebase64sha256("./lambda/lambda_function.zip")
}

# S3 Read Policy
resource "aws_iam_policy" "s3_read_policy" {
  name        = "ai-shop-s3-read-policy"
  description = "Policy to allow reading from S3 bucket"
  tags = {
    name        = "ai-shop-s3-read-policy"
    owner       = "Disraptor"
    environment = "prod"
    service     = "S3 bucket"
    type        = "application"
  }

  policy = jsonencode({
    "Version" : "2012-10-17",
    "Statement" : [
      {
        "Effect" : "Allow",
        "Action" : [
          "s3:GetObject",
          "s3:ListBucket"
        ],
        "Resource" : [
          "${data.aws_s3_bucket.vector_bucket.arn}/*",
          data.aws_s3_bucket.vector_bucket.arn
        ]
      }
    ]
  })
}

# Policy Attachment
resource "aws_iam_role_policy_attachment" "s3_access_attachment" {
  policy_arn = aws_iam_policy.s3_read_policy.arn
  role       = aws_iam_role.lambda_role.name
}

# Policy for lambda function to be triggered by an s3 bucket
resource "aws_iam_policy" "lambda_s3_policy" {
  name        = "lambda-s3-trigger-policy"
  description = "IAM policy to allow Lambda to be triggered by S3 events"
  tags = {
    name        = "ai-shop-s3-lambda-trigger-policy"
    owner       = "Disraptor"
    environment = "prod"
    service     = "S3 bucket"
    type        = "application"
  }

  policy = jsonencode({
    Version = "2012-10-17",
    Statement = [
      {
        Action = [
          "lambda:InvokeFunction",
        ],
        Effect   = "Allow",
        Resource = aws_lambda_function.lambda_code.arn,
      },
      {
        Action = [
          "s3:GetObject",
          "s3:PutObject",
        ],
        Effect   = "Allow",
        Resource = "${data.aws_s3_bucket.vector_bucket.arn}/*",
      },
    ],
  })
}

# Policy Attachment
resource "aws_iam_role_policy_attachment" "lambda_trigger_attachment" {
  policy_arn = aws_iam_policy.lambda_s3_policy.arn
  role       = aws_iam_role.lambda_role.name
}


# Policy for lambda to access aws rds
resource "aws_iam_policy" "lambda_aurora_write_policy" {
  name        = "LambdaAuroraWritePolicy"
  description = "Policy for Lambda to write to Aurora"

  tags = {
    name        = "ai-shop-LambdaAuroraWritePolicy"
    owner       = "Disraptor"
    environment = "prod"
    service     = "S3 bucket"
    type        = "application"
  }

  policy = jsonencode({
    Version = "2012-10-17",
    Statement = [
      {
        Effect = "Allow",
        Action = [
          "rds-data:ExecuteStatement",
          "rds-data:BatchExecuteStatement"
        ],
        Resource = "arn:aws:rds:af-south-1:212546990317:cluster:vector-instance-ai-shop" // Or specify the resource ARN of your Aurora database
      }
    ]
  })
}

# Policy Attachment
resource "aws_iam_role_policy_attachment" "lambda_aurora_write_attachment" {
  policy_arn = aws_iam_policy.lambda_aurora_write_policy.arn
  role       = aws_iam_role.lambda_role.name
}


# Invoking lambda function
resource "aws_s3_bucket_notification" "example" {
  bucket = data.aws_s3_bucket.vector_bucket.bucket

  lambda_function {
    lambda_function_arn = aws_lambda_function.lambda_code.arn
    events              = ["s3:ObjectCreated:*"] # Trigger Lambda on object creation
    filter_prefix       = ""                     # Trigger on all files uploaded
    filter_suffix       = ""                     # Trigger on all file types
  }
}

# Invoking lambda function
resource "aws_lambda_permission" "s3_invoke_permission" {
  statement_id  = "AllowS3Invocation"
  action        = "lambda:InvokeFunction"
  function_name = aws_lambda_function.lambda_code.function_name
  principal     = "s3.amazonaws.com"
  source_arn    = data.aws_s3_bucket.vector_bucket.arn
}

# Cloudwatch Policy
resource "aws_iam_policy" "lambda_cloudwatch_logs_policy" {
  name        = "LambdaCloudWatchLogsPolicy"
  description = "Policy for Lambda to write errors to CloudWatch Logs"
  tags = {
    name        = "ai-shop-s3-cloudwatch-policy"
    owner       = "Disraptor"
    environment = "prod"
    service     = "S3 bucket"
    type        = "application"
  }

  policy = jsonencode({
    Version = "2012-10-17",
    Statement = [{
      Effect = "Allow",
      Action = [
        "logs:CreateLogGroup",
        "logs:CreateLogStream",
        "logs:PutLogEvents"
      ],
      Resource = "arn:aws:logs:*:*:*"
    }]
  })
}




# Policy Attachment
resource "aws_iam_role_policy_attachment" "lambda_logs_attachment" {
  role       = aws_iam_role.lambda_role.name
  policy_arn = aws_iam_policy.lambda_cloudwatch_logs_policy.arn
}
