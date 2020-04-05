import React from 'react'
import { GetServerSideProps } from 'next'
import Head from 'next/head'
import { ssr, useUnserialize, provide, useProvide } from 'lamp-luwak'
import { HeroList } from '../services/HeroList'

const List = () => {
  const heroList = useProvide(HeroList);
  return (
    <ul>
      {heroList.getList().map(({ id, name, saying }) => (
        <li key={id}>
          <div>
            {id}: {name}
            <pre>"{saying}"</pre>
          </div>
        </li>
      ))}
    </ul>
  );
}

const Home = ({ data }: any) => {
  useUnserialize(data);
  return (
    <>
      <Head>
        <title>examples/ssr</title>
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
  props.data = await ssr(async () => {
    await provide(HeroList).fetch();
  });
  return { props };
}

export default Home;
