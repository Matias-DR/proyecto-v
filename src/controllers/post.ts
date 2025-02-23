import api from '@/infra/axios'

import { Category, Country, Post, Region } from '@/core/post'
import {
  DeleteParamsPost,
  DeleteResponsePost,
  GetParamsPosts,
  GetResponsePost,
  GetResponsePosts,
  LikeParamsPost,
  LikeResponsePost,
  PostBodyPost,
  PostResponsePost
} from '@/core/post/api'
import { formatURL } from '@/lib/utils'

export interface PostPostControllerProps {
  body: PostBodyPost
}

export interface GetPostsControllerProps {
  params: GetParamsPosts
}

export interface DeletePostControllerProps {
  params: DeleteParamsPost
}

export interface LikePostControllerProps {
  params: LikeParamsPost
}

export const postPostController = async ({ body }: PostPostControllerProps): Promise<PostResponsePost> => {
  const formData = new FormData()
  Object.entries(body).forEach(([key, value]) => {
    if (Array.isArray(value)) formData.append(key, JSON.stringify(value))
    else formData.append(key, value)
  })
  return await api.post('/api/post/create', formData).then((res) => res.data)
}

export const getPostsController = async ({ params }: GetPostsControllerProps): Promise<GetResponsePosts> => {
  const url = formatURL('/api/post/get', params)
  const res = await api
    .get<Array<Omit<Post, 'category' | 'region' | 'country'> & { category: string; region: string; country: string }>>(url)
    .then((res) => res.data)
  const adaptedPosts: GetResponsePosts = res.map(
    (post): GetResponsePost => ({
      ...post,
      category: (post.category ? (post.category.includes('[') ? JSON.parse(post.category) : [post.category]) : []) as Category[],
      region: (post.region ? (post.region.includes('[') ? JSON.parse(post.region) : [post.region]) : []) as Region[],
      country: (post.country ? (post.country.includes('[') ? JSON.parse(post.country) : [post.country]) : []) as Country[]
    })
  )
  return adaptedPosts
}

export const deletePostController = async ({ params }: DeletePostControllerProps) => {
  const url = formatURL('/api/post/delete', params)
  return await api.delete<DeleteResponsePost>(url).then((res) => res.data)
}

export const likePostController = async ({ params }: LikePostControllerProps) => {
  const url = formatURL('/api/post/like', params)
  return await api.patch<LikeResponsePost>(url).then((res) => res.data)
}
