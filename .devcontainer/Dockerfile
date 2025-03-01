# https://hub.docker.com/r/microsoft/devcontainers
FROM --platform=linux/amd64 mcr.microsoft.com/devcontainers/javascript-node:22

# Install additional packages
RUN apt-get update && apt-get install -y \
    curl \
    git \
    jq \
    vim \
    && rm -rf /var/lib/apt/lists/*

# Ensure correct permissions
RUN chown -R node:node /home/node

# Prepare the directory for GPG keys
RUN install -m 0755 -d /etc/apt/keyrings

# Configure Terraform Apt Repository
RUN curl -fsSL https://apt.releases.hashicorp.com/gpg -o /etc/apt/keyrings/terraform-archive-keyring.asc \
    && echo "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/terraform-archive-keyring.asc] https://apt.releases.hashicorp.com $(lsb_release -cs) main" \
        | tee /etc/apt/sources.list.d/terraform.list \
    && apt-get update

# Install Terraform
RUN apt-get install -y terraform \
    && rm -rf /var/lib/apt/lists/*

# Install CDKTF CLI
RUN npm install -g cdktf-cli@latest

USER node
