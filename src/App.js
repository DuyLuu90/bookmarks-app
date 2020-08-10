import React, { Component } from 'react';
import {Route,Switch} from 'react-router-dom'
import AddBookmark from './AddBookmark/AddBookmark';
import BookmarkList from './BookmarkList/BookmarkList';
import Nav from './Nav/Nav';
import './App.css';
import {BookmarkApiServices} from './api-service'

class App extends Component {
  state = {
    page: 'list',
    bookmarks: [],
    error: null,
  };

  changePage = (page) => {
    this.setState({ page })
  }

  setBookmarks = bookmarks => {
    this.setState({bookmarks,error: null,page: 'list'})
  }

  addBookmark = bookmark => {
    this.setState({
      bookmarks: [ ...this.state.bookmarks, bookmark ],
    })
  }
  
  componentDidMount() {
    BookmarkApiServices.getAllItems()
      .then(json=>this.setState({bookmarks:json}))
      .catch(err=>this.setState({error:err}))
  }

  onSuccess= ()=>{
    BookmarkApiServices.getAllItems()
      .then(json=>this.setState({
        bookmarks:json,
        page: 'list',
      }))
      .catch(err=>this.setState({error:err}))
  }

  renderPage=()=> {
    const { page, bookmarks} = this.state
    return (
      <main className='App'>
        <h1>Bookmarks!</h1>
        <Nav clickPage={this.changePage} />
        <div className='content' aria-live='polite'>
          {page === 'add' && (
            <AddBookmark
              onSuccess={this.onSuccess}
              onClickCancel={() => this.changePage('list')}
            />
          )}
          {page === 'list' && (
            <BookmarkList bookmarks={bookmarks}
            onDeleteSuccess= {this.onSuccess}
            />
          )}
        </div>
      </main>
    );
  }

  render() {
    return(
      <Switch>
        <Route exact path={'/'} component={this.renderPage}/>
        <Route path={'/:bookmarkId'} component={(props)=>{
            const id= Number(props.match.params.bookmarkId)
            const bookmark= this.state.bookmarks.find(b=>b.id===id)
            return <AddBookmark {...props} onClickCancel={()=>props.history.goBack()} onSuccess={this.onSuccess}
            bookmark={bookmark}/>
        }}/>
      </Switch>
    )
    
  }
}

export default App;
