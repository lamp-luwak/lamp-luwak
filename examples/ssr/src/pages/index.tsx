import React from 'react'
import { GetServerSideProps } from 'next'
import Head from 'next/head'
import { zone, serialize, useUnserialize, provide } from '../lib/core'
import { List } from '../components/List'
import { HeroList } from '../services/HeroList'

const Home = ({ data }: any) => {
  useUnserialize(data);
  return (
    <>
      <Head>
        <title>Ssr</title>
      </Head>
      <header>
        <nav>
          <a href="/api">API</a>
        </nav>
      </header>
      <main>
        <List />
      </main>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async () => {
  const props = {} as any;
  await zone(async () => {
    await provide(HeroList).fetch();
    props.data = serialize();
  });
  return { props };
}

export default Home;
