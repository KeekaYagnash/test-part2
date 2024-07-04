plugin "aws" {
  enabled = true
  version = "0.32.0"
  source  = "github.com/terraform-linters/tflint-ruleset-aws"
  deep_check = true
}

rule "aws_resource_missing_tags" {
  enabled = true
  tags = ["Name", "Owner", "environment", "service", "type"]
}

rule "aws_s3_bucket_name" {
  enabled = true
  regex = "^[a-z\\-]+$"
}