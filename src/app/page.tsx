import styles from './page.module.css';

export default function Home() {
  return (
    <main className={styles.main}>
      <div className={styles.description}>
        <h1>Welcome to Next.js with Node.js 20</h1>
        <p>
          Get started by editing{' '}
          <code className={styles.code}>src/app/page.tsx</code>
        </p>
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
      </div>
    </main>
  );
}