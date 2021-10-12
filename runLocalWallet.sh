docker run -it \
    -p 8701:8701 \
    -e PORT=8701 \
    -e FLOW_ACCESS_NODE=http://host.docker.internal:8080 \
    -e FLOW_ACCOUNT_KEY_ID=0 \
    -e FLOW_ACCOUNT_PRIVATE_KEY=348bdc3216e6571ced8faf35ef6d5336d1dcda5895e1abcc556fa780bd0ac081 \
    -e FLOW_ACCOUNT_PUBLIC_KEY=0ff5287ee03da6425c9613b9e637093f742b7d724f791b9315594652ef28802ca0f576656d8962a3f6b02a30ccdb3be441d16611b82b751cb6483a26dc7ddf6f \
    -e FLOW_INIT_ACCOUNTS=0 \
    -e FLOW_ACCOUNT_ADDRESS=0xf8d6e0586b0a20c7 \
    -e FLOW_AVATAR_URL=https://avatars.onflow.org/avatar/ \
    ghcr.io/onflow/fcl-dev-wallet:latest  