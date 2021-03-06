import React from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';

import PostList from '../constants/PostList';
import Layout from './Layout';

interface PostLayoutProps {
    slug: string;
}

const PostLayout: React.FC<PostLayoutProps> = ({ children, slug }) => {
    const numTasks = PostList.length;
    const post = PostList.find(post => post.slug === slug);
    const index = PostList.indexOf(post);
    const title = post.title;

    return (
        <Layout>
            <Helmet>
                <title>this vs that - {title}</title>
                <meta name='description' content={title} />
            </Helmet>

            <h1 className='font-semibold mt-24 mb-4 text-center text-3xl lg:text-5xl px-1'>{title}</h1>

            <div className="mb-32 text-center">
                <a
                    className="text-2xl bg-gray-400 px-4 py-2 text-white rounded-full"
                    href={`https://github.com/phuoc-ng/this-vs-that/blob/master/client/posts/${slug}/index.tsx`}
                    rel="noopener noreferrer"
                    target="_blank"
                    style={{
                        backgroundColor: '#6C5CE7',
                    }}
                >
                    Edit this page
                </a>
            </div>

            <div className='mb-16 px-4 py-12 relative'>
                <div
                    className='absolute bg-white h-full left-0 top-0 w-full shadow-2xl'
                    style={{
                        transform: 'skewY(-4deg)',
                        zIndex: -1,
                    }}
                />
                {children}
            </div>
            {index > 0 && (
                <div className='mb-4'>
                    <Link
                        className='text-xl sm:text-2xl text-white rounded-full px-4 py-2'
                        to={`/${PostList[index - 1].slug}`}
                        title={PostList[index - 1].title}
                        style={{
                            backgroundColor: '#6C5CE7',
                        }}
                    >
                        ← {PostList[index - 1].title}
                    </Link>
                </div>
            )}
            {index < numTasks - 1 && (
                <div className='mb-4 text-right'>
                    <Link
                        className='text-xl sm:text-2xl text-white rounded-full px-4 py-2'
                        to={`/${PostList[index + 1].slug}`}
                        title={PostList[index + 1].title}
                        style={{
                            backgroundColor: '#6C5CE7',
                        }}
                    >
                        {PostList[index + 1].title} →
                    </Link>
                </div>
            )}
        </Layout>
    );
};

export default PostLayout;
