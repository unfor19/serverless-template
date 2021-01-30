FROM nikolaik/python-nodejs:python3.8-nodejs12-alpine
RUN yarn global add serverless@2.21.1 typescript@3.8.2 && \
    pip3 install awscli --upgrade --no-cache-dir && \
    apk --no-cache add jq curl bash bash-completion apache2-utils git zip unzip

RUN \
    curl --silent -o /root/.git-prompt.sh https://raw.githubusercontent.com/git/git/master/contrib/completion/git-prompt.sh \
    && echo 'export PATH=$PATH:/usr/local/bin' >> /root/.bashrc \
    && echo 'source ~/.git-prompt.sh' >> /root/.bashrc \
    && echo 'export PS1="\[\033[01;34m\]$ \w\[\033[00m\]$(__git_ps1) "' >> /root/.bashrc    

WORKDIR /code
CMD ["bash"]
