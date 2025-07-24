# review

- .vscode/settings.json eksik
- nuxtın auto-import özelliği kullan (örn: import { isDark, toggleTheme } from '~/utils/theme' gibi importlara gerek yok)
- filmleri çekememe sebebin genel film listesini çekmeye çalışman değil sen şuanda bir kullanıcının filmlerini çekmeye çalışıyorsun dökümanları daha dikkatli oku!
- sayfa yönlendirmelerini path vererek değil name vererek yap.
- storeları bu kadar detalı ayırmana gerek yok movie.ts isimli bir store aç içerisinde movieList ve fetchMovieList bulundur. fetchMovieList parametre olarak ne alıyorsa o isteğin sonucunu direkt movieListe atsın.

Küçük bir ipucu: movie ve tv olarak ayrımana gerek yok tek bir media.ts işini çözecektir

# Nuxt Minimal Starter

Look at the [Nuxt documentation](https://nuxt.com/docs/getting-started/introduction) to learn more.

## Setup

Make sure to install dependencies:

```bash
# npm
npm install

# pnpm
pnpm install

# yarn
yarn install

# bun
bun install
```

## Development Server

Start the development server on `http://localhost:3000`:

```bash
# npm
npm run dev

# pnpm
pnpm dev

# yarn
yarn dev

# bun
bun run dev
```

## Production

Build the application for production:

```bash
# npm
npm run build

# pnpm
pnpm build

# yarn
yarn build

# bun
bun run build
```

Locally preview production build:

```bash
# npm
npm run preview

# pnpm
pnpm preview

# yarn
yarn preview

# bun
bun run preview
```

Check out the [deployment documentation](https://nuxt.com/docs/getting-started/deployment) for more information.
