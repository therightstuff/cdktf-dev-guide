# CDKTF Dev Guide

This project is a guide to help you get started with CDKTF.

## Getting Started

### Prerequisites

- Node.js (v18.x or higher)
- AWS account
  - Configure your AWS CLI credentials for a user on the account you'd like to deploy to
- AWS CLI
  - `brew install awscli`
  - Configure your AWS CLI with your credentials (`aws configure` / `aws configure --profile <profile-name>`)
- CDKTF CLI
  - `brew install cdktf`
- Terraform CLI
  - `brew install terraform`

## Initializing a new project

1. Create a new directory for your project
1. Run `cdktf init --template=typescript --local` to initialize the project
   1. Select your desired provider(s)
1. Update the `cdktf.json` file with the correct provider(s)
1. Run `npm run get` to fetch the provider(s)
1. Run `npm install` to install the dependencies
1. Run `npm run synth` to synthesize the project's stack
1. Run `cdktf deploy` to deploy the project

To set up a terraform state backend, create a new stack for the state resources, or manually create the resources yourself.
For AWS, this will include an S3 bucket and a DynamoDB table.
Once the state resources are created:

1. Include the appropriate backend construct in your app stack and synthesize the project
1. From within the app's `cdktf.out` directory, run `terraform init -reconfigure` to re-initialize the terraform state.
   ```shell
   cd cdktf.out/stacks/my-app
   terraform init -reconfigure
   ```
1. Re-deploy the app stack

## Using this repository

1. Clone the repository
1. Run `npm install` to install the dependencies
1. Run `npm run synth` to synthesize the project's stacks
1. Run `cdktf deploy cdktf-state` to deploy the terraform state backend stack
1. Run `cdktf deploy my-app` to deploy the app stack

