import React, { Component } from 'react';
import BookmarkItem from '../BookmarkItem/BookmarkItem';
import './BookmarkList.css'
import {BookmarkApiServices} from '../api-service'

class BookmarkList extends Component {
  static defaultProps = {
    bookmarks: []
  };

  handleDelete= id=>{
    BookmarkApiServices.deleteItemById(id)
      .then(()=>this.props.onDeleteSuccess())
      .catch(err=>console.log(err))
  }

  render() {
    const { bookmarks } = this.props
    return (
      <section className='BookmarkList'>
        <h2>Your bookmarks</h2>
        <ul className='BookmarkList__list' aria-live='polite'>
          {bookmarks.map(bookmark =>
            <BookmarkItem
              onClickDelete={this.handleDelete}
              key={bookmark.id}
              {...bookmark}
            />
          )}
        </ul>
      </section>
    );
  }
}

export default BookmarkList;
