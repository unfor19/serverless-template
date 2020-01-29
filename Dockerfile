FROM nikolaik/python-nodejs:python3.8-nodejs12-alpine
RUN yarn global add serverless typescript && \
    pip3 install awscli --upgrade && \
    apk --no-cache add jq curl bash bash-completion
WORKDIR /code
CMD ["bash"]
