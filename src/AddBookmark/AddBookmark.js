import React, { Component } from  'react';
import './AddBookmark.css';
import {BookmarkApiServices} from '../api-service'

const Required = () => (
  <span className='AddBookmark__required'>*</span>
)

class AddBookmark extends Component {
  static defaultProps = {
    onAddBookmark: () => {},
    bookmark:{},
    history: {
      goBack: ()=>{}
    },
    onSuccess: ()=>{}
  };

  state = {
    error: null,
  };

  handleSubmit = e => {
    e.preventDefault()
    const { title, url, description, rating } = e.target
    const data = {
      title: title.value,
      url: url.value,
      description: description.value,
      rating: rating.value,
    }
    this.setState({ error: null })

    const {bookmark}= this.props
    if (bookmark.id) {
      BookmarkApiServices.patchItemById(bookmark.id,data)
      .then(()=>{
        this.props.onSuccess()
        this.props.history.goBack()
      })
      .catch((err)=>console.log(err))
    }

    else {
      BookmarkApiServices.postItem(data)
      .then(data => {
        title.value = ''
        url.value = ''
        description.value = ''
        rating.value = ''
        this.props.onSuccess()
        this.props.history.goBack()
      })
      .catch(error => this.setState({ error }))
    }
  }

  render() {
    const { error} = this.state
    const { onClickCancel,bookmark } = this.props
    return (
      <section className='AddBookmark'>
        <h2>Create a bookmark</h2>
        <form className='AddBookmark__form'
          onSubmit={this.handleSubmit}
        >
          <div className='AddBookmark__error' role='alert'>
            {error && <p>{error.message}</p>}
          </div>
          <div>
            <label htmlFor='title'>
              Title
              {' '}
              <Required />
            </label>
            <input type='text'name='title'id='title' defaultValue={bookmark.title}
              placeholder='Great website!'required/>
          </div>
          <div>
            <label htmlFor='url'>
              URL
              {' '}
              <Required />
            </label>
            <input type='url'name='url'id='url' defaultValue={bookmark.url}
              placeholder='https://www.great-website.com/'
              required/>
          </div>
          <div>
            <label htmlFor='description'>
              Description
            </label>
            <textarea name='description'id='description'defaultValue={bookmark.description}/>
          </div>
          <div>
            <label htmlFor='rating'>
              Rating
              {' '}
              <Required />
            </label>
            <input type='number'name='rating'id='rating'
              defaultValue={bookmark.rating}min='1'max='5'required/>
          </div>
          <div className='AddBookmark__buttons'>
            <button type='button' onClick={onClickCancel}>
              Cancel
            </button>
            {' '}
            <button type='submit'>Save</button>
          </div>
        </form>
      </section>
    );
  }
}

export default AddBookmark;
