plugin "aws" {
  enabled = true
  version = "0.32.0"
  source  = "github.com/terraform-linters/tflint-ruleset-aws"
}

rule "aws_instance_invalid_type" {
  enabled = true
}

rule "aws_instance_required_tags" {
  enabled = true
  tags = ["Name", "Owner", "environment", "service", "type"]
}

rule "aws_s3_bucket_required_tags" {
  enabled = true
  tags = ["Name", "Owner", "environment", "service", "type"]
}

rule "aws_security_group_required_tags" {
  enabled = true
  tags = ["Name", "Owner", "environment", "service", "type"]
}

rule "aws_lambda_function_required_tags" {
  enabled = true
  tags = ["Name", "Owner", "environment", "service", "type"]
}

rule "aws_dynamodb_table_required_tags" {
  enabled = true
  tags = ["Name", "Owner", "environment", "service", "type"]
}

rule "aws_rds_instance_required_tags" {
  enabled = true
  tags = ["Name", "Owner", "environment", "service", "type"]
}

rule "aws_elb_required_tags" {
  enabled = true
  tags = ["Name", "Owner", "environment", "service", "type"]
}

rule "aws_alb_required_tags" {
  enabled = true
  tags = ["Name", "Owner", "environment", "service", "type"]
}

rule "aws_vpc_required_tags" {
  enabled = true
  tags = ["Name", "Owner", "environment", "service", "type"]
}

rule "aws_subnet_required_tags" {
  enabled = true
  tags = ["Name", "Owner", "environment", "service", "type"]
}

rule "aws_iam_role_required_tags" {
  enabled = true
  tags = ["Name", "Owner", "environment", "service", "type"]
}
