import { TerraformStack } from "cdktf";
import { Construct } from "constructs";
import { S3Bucket } from "@cdktf/provider-aws/lib/s3-bucket";
import { DynamodbTable } from "@cdktf/provider-aws/lib/dynamodb-table";
import { AwsProvider } from "@cdktf/provider-aws/lib/provider";
import { S3BucketServerSideEncryptionConfigurationA } from "@cdktf/provider-aws/lib/s3-bucket-server-side-encryption-configuration";
import { S3BucketVersioningA } from "@cdktf/provider-aws/lib/s3-bucket-versioning";

// This is used to create a unique ID for the S3 bucket which must be unique across all AWS accounts
const UNIQUE_ID_ELEMENT = "therightstuff";
export const DYNAMO_DB_TABLE_NAME = "terraform-state-lock";
export const STATE_BUCKET_NAME = `terraform-state-bucket-${UNIQUE_ID_ELEMENT}`;

export class StateStack extends TerraformStack {
    constructor(scope: Construct, id: string) {
      super(scope, id);
  
      // Configure AWS provider for this stack
      new AwsProvider(this, "AWS", {
        region: "us-east-1",
        // profile: "CDKTF"
      });

      // Create a S3 bucket for the Terraform state
      new S3Bucket(this, STATE_BUCKET_NAME, {
        bucket: STATE_BUCKET_NAME,
        forceDestroy: true
      });

      // set up versioning for the bucket
      new S3BucketVersioningA(this, `${STATE_BUCKET_NAME}-versioning`, {
        bucket: STATE_BUCKET_NAME,
        versioningConfiguration: {
          status: "Enabled",
        },
      });

      // set up server-side encryption for the bucket
      new S3BucketServerSideEncryptionConfigurationA(this, `${STATE_BUCKET_NAME}-server-side-encryption`, {
        bucket: STATE_BUCKET_NAME,
        rule: [{
          applyServerSideEncryptionByDefault: {
            sseAlgorithm: "AES256"
          }
        }]
      });

      // Create a DynamoDB table for the Terraform state lock
      new DynamodbTable(this, DYNAMO_DB_TABLE_NAME, {
        name: DYNAMO_DB_TABLE_NAME,
        hashKey: "LockID",
        attribute: [{
          name: "LockID",
          type: "S",
        }],
        billingMode: "PAY_PER_REQUEST",
      });
    }
  }
  
  