import { Construct } from "constructs";
import { TerraformStack } from "cdktf";
import { ApiGatewayRestApi } from "@cdktf/provider-aws/lib/api-gateway-rest-api";
import { AwsProvider } from "@cdktf/provider-aws/lib/provider";
import { useS3Backend } from "./StateStack";

export class AppStack extends TerraformStack {
  constructor(scope: Construct, id: string, customOptions: any = {}) {
    super(scope, id);

    useS3Backend(this, id, customOptions.profile);

    // Configure AWS Provider
    new AwsProvider(this, "AWS", {
      region: customOptions.region || "us-east-1",
      profile: customOptions.profile
    });

    // create an API gateway endpoint
    new ApiGatewayRestApi(this, "ApiGateway", {
      name: "api",
      description: "API Gateway for the platform",
    });
  }
}