# Config app environment variable
export NODE_ENV=development
export PORT=8888


# URL of the Mongo DB
export MONGODB_URL="mongodb://127.0.0.1:27017/mern-auth"
# export MONGODB_URL="mongodb+srv://<username>:<password>@cluster0.wqu70.mongodb.net/<database_name>?retryWrites=true&w=majority"


# JWT
# JWT secret key
export JWT_ACCESS_SECRET=123123
export JWT_REFRESH_SECRET=123123
export JWT_ACTIVATE_SECRET=123123
export JWT_RESET_PASSWORD_SECRET=10m

# JWT expirations
export JWT_ACCESS_EXPIRATION=15m
export JWT_REFRESH_EXPIRATION=30days
export JWT_RESET_PASSWORD_EXPIRATION=10m
export JWT_ACTIVATE_EXPIRATION=5m

# Token github
# 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


# GOOGLE APIS
export G_CLIENT_ID=475832399723-ml78uslm7malg5dce29ipeboceede68b.apps.googleusercontent.com
export G_CLIENT_SECRET=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
export G_REFRESH_TOKEN=1//04P3BSN-bo5oQCgYIARAAGAQSNwF-L9Ir2TiSl3Y0nJresd21791jL0dtf21hi_DCRuM7KRxk4b65F7jzgfo2zV8PfU17_PxoXM8

# EMAIL
export ADMIN_EMAIL=minhchiu.it@gmail.com

# CLOUDINARY 
export CLOUD_NAME=djvd6zhbg
export CLOUD_API_KEY=849999119615753
export CLOUD_API_SECRET=X_g1A1Y2E1s9bGeuFaALttvOeLg


# 
export FB_SECRET=GwcTnAckK7xgb3jkzbSUkUHemz4Kbzg36hRHTjNb
export G_SECRET=GwcTnAckK7xgb3jkzbSUkUHemz4Kbzg36hRHTjNb


# SMTP configuration options for the email service
export SMTP_HOST=smtp.gmail.com
export SMTP_PORT=587
export SMTP_USERNAME=minhchiu.it
export SMTP_PASSWORD=Minh.it.01
export EMAIL_FROM=minhchiu.it