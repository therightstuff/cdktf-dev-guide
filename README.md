# CDKTF Dev Guide

This project is a guide to help you get started with CDKTF.

## Getting Started

### Prerequisites

I tried to provide instructions for configuring this repo both for MacOS (easy) and for other platforms, but had so much trouble
with the Windows setup ([chocolatey](https://chocolatey.org/) is not my friend) that I gave up and added a Linux devcontainer
instead. Let's all just use devcontainers. All your prerequisite tools will be installed when you open this one.

(Note: for MacOS, all prerequisites are available via [Homebrew](https://brew.sh/))

- Node.js (v18.x or higher)
- AWS account
  - Configure your AWS CLI security credentials for a user on the account you'd like to deploy to
- AWS CLI
  - Configure your AWS CLI with your credentials (`aws configure` / `aws configure --profile <profile-name>`)
- CDKTF CLI
- Terraform CLI

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

If you want to create the backend resources using `cdktf`, bear in mind that you won't be able to modify those resources
from a different machine than the one they were created from.

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
