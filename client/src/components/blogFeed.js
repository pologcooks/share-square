import React from 'react'
import './styles/blog.css'
import { GET_SQUARES, SEARCH_SQUARES } from '../utils/queries'
import { useMutation, useQuery } from '@apollo/client';
import { Link, useParams } from 'react-router-dom';
import { BOOKMARK } from '../utils/mutation';
import Auth from '../utils/auth';

const BlogFeed = () => {
    const profile = Auth.getProfile();
    const userId = profile.data._id

    const { loading, data } = useQuery(GET_SQUARES);

    console.log(data)

    const [Bookmark] = useMutation(BOOKMARK);

    const bookmarkSquare = async (e) => {
        e.preventDefault();

        const squareId = e.target.getAttribute('square-id');

        const response = await Bookmark({
            variables: {
                user: userId,
                square: squareId,
            },
        });
    }

    // const searchSquares = async (e) => {
    //     e.preventDefault();

    //     const search = e.target.value;

    //     console.log(search)

    //     const { loading, error, data } = useQuery(SEARCH_SQUARES, {
    //         variables: { input },
    //     });
    
    // }

    return (
        <>
        { data ? (
        <section className='blog-feed'>
            {data.squares.map((square) => (
                <div
                    key={square._id}
                    className="square"
                >
                    <div className='square-img' style={{ backgroundImage: `url(${square.image})` }}>

                    </div>
                    <div className='square-description'>
                        <h2>{square.name}</h2>
                        <div className='square-line'></div>
                        <p className='short-description'>{square.shortDescription}</p>
                        <div className='likes-and-activity'>
                            <div className='likes-total'>
                                <img src='images/red-heart-icon.png' width='15px' height='15px'></img>
                                <h6>{square.likes}</h6>
                            </div>
                            <div className='posts-total'>
                                <img src='images/posts-icon.png' width='15px' height='15px'></img>
                                <h6>{square.postCount}</h6>
                            </div>

                        </div>
                        <div className='square-line-2'></div>
                        <div className='square-actions'>
                            <div className='square-actions-1'>
                                <div className='square-action-button square-like'>
                                    <img square-id={square._id} src='images/heart-icon.png' width='22px'></img>
                                </div>
                                <div className='square-action-button square-save'>
                                    <img onClick={bookmarkSquare} src='images/save.png' width='15px'></img>
                                </div>
                                <div className='square-action-button square-remove'>
                                    <img src='images/x-icon.png' width='19px'></img>
                                </div>
                            </div>
                            <div className='square-actions-2'>
                            <Link  to={`/SquareView/${square._id}`}>
                                <button className='view-square'>
                                    View Square
                                    <img src='images/arrow-icon.png' height='15px'></img>
                                </button>
                                </Link>
                            </div>
                        </div>
                    </div>


                </div>
            ))}
        </section>
        ) : null}
            {loading ? <img  alt="loading" /> : null}
        </>
    )
}

export default BlogFeed