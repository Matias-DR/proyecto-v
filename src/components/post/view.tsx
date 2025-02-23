'use client'

import { useSearchParams } from 'next/navigation'
import { Fragment, useEffect } from 'react'

import Filter from '@/components/post/filter'
import Grid from '@/components/post/grid'

import { PostsProvider, usePostsContext } from '@/contexts/posts'
import { Post } from '@/core/post'
import { useGetPostsController } from '@/hooks/post'

const View = () => {
  const { params, setParams } = usePostsContext()
  const { data, isError } = useGetPostsController({ params })

  const myPosts = useSearchParams().get('my-posts') as Post['_id'] | null

  useEffect(() => {
    if (myPosts) setParams({ myPosts: true })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <Fragment>
      <Grid
        posts={data}
        isError={isError}
        postId={myPosts ? myPosts : undefined}
      />
      <Filter
        params={params}
        setParams={setParams}
      />
    </Fragment>
  )
}

const WithContext = () => (
  <PostsProvider>
    <View />
  </PostsProvider>
)

export default WithContext
