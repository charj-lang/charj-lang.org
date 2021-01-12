import Head from "next/head"
import Header from "../../components/Header"
import {getPostBySlug, getAllPosts} from "../../lib/api"
import Markdown from "../../components/Markdown"

interface PostType {
    slug: string
    title: string
    date: string
    content: string
}

interface Props {
    post: PostType
    morePosts: PostType[]
    preview?: boolean
}

const Post = ({post, morePosts, preview}: Props) => {
  return (
    <div className='bg-white'>
      <Head><title>{post.title} | Datum - 语言的语言 && 下一代企业级编程语言</title></Head>
      <Header/>
      <article className='max-w-screen-md mx-auto px-4 sm:px-6 md:px-8 py-8 mb-16'>
        <h1 className='tracking-tight font-bold text-5xl leading-10 mt-4 py-8'>{post.title}</h1>
        <div className='mt-8 -mx-4'>
          <Markdown source={post.content}/>
        </div>
      </article>
    </div>
  )
}

export default Post

interface Params {
    params: {
        slug: string
    }
}

export async function getStaticProps({params}: Params) {
  const post = getPostBySlug(params.slug, [
    "title",
    "date",
    "slug",
    "content"
  ])

  return {
    props: {
      post,
    }
  }
}

export async function getStaticPaths() {
  const posts = getAllPosts(["slug"])

  return {
    paths: posts.map((posts) => {
      return {
        params: {
          slug: posts.slug
        }
      }
    }),
    fallback: false
  }
}
