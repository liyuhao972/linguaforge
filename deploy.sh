#!/bin/bash
set -e

# 部署到 Cloudflare Pages
npx wrangler pages deploy dist --project-name=linguaforge --branch=main 2>&1
