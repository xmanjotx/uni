import styles from './page.module.css';
import Button from '../components/ui/Button';

export default function Home() {
  return (
    <main className={styles.main}>
      <div className={styles.description}>
        <h1>Welcome to Next.js 14.2.4 with Node.js 20</h1>
        <p>
          Get started by editing{' '}
          <code className={styles.code}>src/app/page.tsx</code>
        </p>
        <p className={styles.deploymentNote}>
          Successfully deployed on Cloudflare Pages!
        </p>
        <div className={styles.buttonContainer}>
          <Button variant="primary" size="medium">Primary Button</Button>
          <Button variant="secondary" size="medium">Secondary Button</Button>
          <Button variant="outline" size="medium">Outline Button</Button>
        </div>
      </div>

      <div className={styles.grid}>
        <a
          href="https://nextjs.org/docs"
          className={styles.card}
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2>
            Docs <span>-&gt;</span>
          </h2>
          <p>Find in-depth information about Next.js features and API.</p>
        </a>

        <a
          href="https://nextjs.org/learn"
          className={styles.card}
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2>
            Learn <span>-&gt;</span>
          </h2>
          <p>Learn about Next.js in an interactive course with quizzes!</p>
        </a>

        <a
          href="https://developers.cloudflare.com/pages/"
          className={styles.card}
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2>
            Cloudflare Pages <span>-&gt;</span>
          </h2>
          <p>Learn about deploying Next.js apps on Cloudflare Pages.</p>
        </a>
      </div>
    </main>
  );
}
}
}
}
}