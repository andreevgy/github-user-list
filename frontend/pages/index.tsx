import type {GetServerSideProps, InferGetServerSidePropsType, NextPage, NextPageContext} from 'next'
import styles from '../styles/Home.module.css'
import {useEffect, useState} from "react";
import {useRouter} from "next/router";
import {useDebouncedEffect} from "../utils/useDebouncedEffect";
import {getUserList, UserListData} from "../api/getUserList";

interface HomePageProps {
  search: string;
  data: UserListData | null;
}

export const getServerSideProps: GetServerSideProps<HomePageProps> = async ({query}) => {
  if (query.q) {
    const res = await getUserList(query.q as string);
    return {props: {search: query.q as string, data: await res}};
  }
  return {
    props: {search: '', data: null},
  }
}

const Home = (props: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const [search, setSearch] = useState(props.search ?? '');
  const {replace, } = useRouter();

  useDebouncedEffect(() => {
    replace(`/?q=${search}`);
  }, [search], 1000);

  const isLoading = props.search !== search;

  return (
    <div className={styles.container}>
      <b className={styles.title}>Type in username to search</b>
      <input className={styles.input} value={search} onChange={e => setSearch(e.target.value)} placeholder="Username"/>
      {isLoading && <i>Loading...</i>}
      <table>
        <thead>
        <tr>
          <td>Avatar</td>
          <td>UserId</td>
          <td>UserName</td>
        </tr>
        </thead>
        <tbody>
        {props.data?.items.map(user => <tr key={user.id}>
          <td><img height={50} alt={`${user.login} avatar`} src={user.avatar_url}/></td>
          <td>{user.id}</td>
          <td>{user.login}</td>
        </tr>)}
        </tbody>
      </table>
      {!props.data?.total_count && <div>No data found!</div> }
    </div>
  )
}

export default Home
