import { Construct } from "constructs";
import { S3Backend, TerraformStack } from "cdktf";
import { ApiGatewayRestApi } from "@cdktf/provider-aws/lib/api-gateway-rest-api";
import { AwsProvider } from "@cdktf/provider-aws/lib/provider";
import { STATE_BUCKET_NAME, DYNAMO_DB_TABLE_NAME } from "./StateStack";
export class AppStack extends TerraformStack {
  constructor(scope: Construct, id: string) {
    super(scope, id);

    // Configure S3 backend
    new S3Backend(this, {
      bucket: STATE_BUCKET_NAME,
      key: "cloud-infra/terraform.tfstate",
      region: "us-east-1",
      encrypt: true,
      dynamodbTable: DYNAMO_DB_TABLE_NAME,
      // profile: "CDKTF"
    });    

    // Configure AWS Provider
    new AwsProvider(this, "AWS", {
      region: "us-east-1",
      // profile: "CDKTF"  // Add your AWS profile if using one
    });

    // create an API gateway endpoint
    new ApiGatewayRestApi(this, "ApiGateway", {
      name: "api",
      description: "API Gateway for the platform",
    });
  }
}