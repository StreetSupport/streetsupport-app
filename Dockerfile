FROM iron/base:edge
RUN echo '@edge http://nl.alpinelinux.org/alpine/edge/main' >> /etc/apk/repositories
RUN apk update && apk upgrade \
  && apk add nodejs@edge nodejs-npm@edge git openssh-client\
  && npm install -g ionic cordova \
  && rm -rf /var/cache/apk/*
RUN mkdir /root/.ssh \
  && ssh-keyscan github.com >> /root/.ssh/known_hosts
RUN ssh-keygen -b 2048 -t rsa -f /tmp/sshkey -q -N "" \
  && eval "$(ssh-agent -s)" \
  && ssh-add /tmp/sshkey \
  && cat /tmp/sshkey.pub \
  && echo 'An ssh key has been generated. Please go to https://github.com/settings/keys to add the key to your account so we can access the application. Then try to build this image again'
RUN eval "$(ssh-agent -s)" \
  && ssh-add /tmp/sshkey \
  && git clone git@github.com:StreetSupport/streetsupport-app.git \
  && cd /streetsupport-app/StreetSupportApp \
  && npm install

WORKDIR /streetsupport-app/StreetSupportApp
CMD [ "ionic", "serve" ]
EXPOSE 8100 35729 53703
