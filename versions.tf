terraform {
  # Require any 1.0.x version of Terraform
  required_version = ">= 1.0.0"
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = ">= 2.70.0"
    }
  }
}
