FROM node:18-alpine 

WORKDIR /app/storefront

COPY . .

RUN rm -rf node_modules

# RUN apt-get update

RUN npm install -g next

RUN npm install --force --loglevel=error

RUN npm run build

# COPY . .

# COPY --from=builder --chown=nextjs:nodejs /app/.next ./.next
# COPY --from=builder /app/node_modules ./node_modules
# COPY --from=builder /app/package.json ./package.json

EXPOSE 8000

ENV PORT 8000

CMD ["npm", "start"]