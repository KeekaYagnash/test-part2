plugin "aws" {
  enabled = true
  version = ">= 0.12.0"
  source  = "github.com/terraform-linters/tflint-ruleset-aws"
}

rule "aws_instance_invalid_type" {
  enabled = true
}
