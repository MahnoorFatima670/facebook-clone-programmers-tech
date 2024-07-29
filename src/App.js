import React, { useState, useEffect, useCallback } from 'react';
import './App.css';

const App = () => {
  const [posts, setPosts] = useState([]);
  const [newPostContent, setNewPostContent] = useState('');
  const [comments, setComments] = useState({});
  const [likes, setLikes] = useState({});
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [editingCommentId, setEditingCommentId] = useState(null);
  const [editedCommentText, setEditedCommentText] = useState('');
  const [currentPostId, setCurrentPostId] = useState(null);

  
  useEffect(() => {
    fetchPosts();
  }, [page]);

  
  const fetchPosts = async () => {
    try {
      const response = await fetch(`https://jsonplaceholder.typicode.com/posts?_page=${page}&_limit=10`);
      const data = await response.json();
      
      if (data.length > 0) {
        const postsWithImages = data.map(post => {
          let imageUrl = null;
          let customBody=post.body;
          let title=post.title;
          // Assign image URLs based on post IDs or other criteria
          if (post.id === 1) {
            customBody = '🌟 Success is not the key to happiness. Happiness is the key to success. If you love what you are doing, you will be successful. Albert Schweitzer Embrace our passions and find happiness in every step we take. Success will follow naturally. Keep doing what you love! 💖'
            title="Mahnoor Fatima";
          } 
            else if (post.id === 2) {
            customBody = 'Life is a beautiful tapestry woven from moments of joy, challenges, and growth. It is easy to get caught up in the pursuit of our goals and forget to appreciate the present. Remember, life is not just about reaching the destination; it is about the journey we take to get there.Each day brings new opportunities and lessons. The highs make us appreciate the good times, and the lows teach us resilience and strength. Its important to find balance, embrace each experience, and live with intention.Instead of focusing solely on what lies ahead, take a moment to reflect on how far you have come. Celebrate your progress, no matter how small, and use it as fuel to keep moving forward. Life is a series of moments, and each one contributes to the person you are becoming.So, live passionately, cherish the little things, and never lose sight of your dreams. The journey is just as important as the destination. 🌈💪';
          title="Ayesha Ahmed";
            imageUrl="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ8yKjnna01l5-KUdHb6ZET_3GP7eRHU3WgLA&s";

          }

          else if (post.id === 3) {
            title="Fatima Sajjad";
            customBody =  'The Power of Perseverance: The Story of Thomas EdisonThomas Edison, one of the greatest inventors in history, is known for his incredible achievements, including the invention of the electric light bulb. However, his journey to success was far from easy. Edison path to greatness was paved with countless failures and setbacks.In the early stages of developing the light bulb, Edison faced over a thousand unsuccessful attempts. Each failure was met with skepticism and doubt from others. Yet, Edison famously said, "I have not failed. I have just found 10,000 ways that would not work." His unwavering belief in his vision and his relentless perseverance kept him moving forward.Edison story teaches us a powerful lesson: success is often the result of persistence in the face of adversity. It is not about avoiding failure but about learning from it and continuing to strive toward your goals. His journey reminds us that setbacks are not the end but rather a stepping stone toward eventual success.When you face challenges in your own life, remember Edison story. Embrace your failures as valuable lessons, and let them fuel your determination. With perseverance and a positive mindset, you too can turn obstacles into opportunities and achieve your dreams.Keep pushing forward, no matter how difficult the path may seem. Success often comes to those who refuse to give up. 🌟💪  ';
          }

          else if (post.id === 4) {
            title="Aliza Aliza";
            customBody='';
            imageUrl="https://wallpapercave.com/wp/wp11615915.jpg";
          }


          else if (post.id === 5) {
            title="Momina Shahzad";
            customBody = '🌟 Success is not the key to happiness. Happiness is the key to success. If you love what you are doing, you will be successful. Albert Schweitzer Embrace our passions and find happiness in every step we take. Success will follow naturally. Keep doing what you love! 💖';
            imageUrl="https://images.saatchiart.com/saatchi/1811284/art/8528061/7592006-HSC00002-7.jpg ";
          }


          else if (post.id === 6) {
            title="Sana Fatima";
            customBody = 'The Power of Perseverance: The Story of Thomas EdisonThomas Edison, one of the greatest inventors in history, is known for his incredible achievements, including the invention of the electric light bulb. However, his journey to success was far from easy. Edison path to greatness was paved with countless failures and setbacks.In the early stages of developing the light bulb, Edison faced over a thousand unsuccessful attempts. Each failure was met with skepticism and doubt from others. Yet, Edison famously said, "I have not failed. I have just found 10,000 ways that would not work." His unwavering belief in his vision and his relentless perseverance kept him moving forward.Edison story teaches us a powerful lesson: success is often the result of persistence in the face of adversity. It is not about avoiding failure but about learning from it and continuing to strive toward your goals. His journey reminds us that setbacks are not the end but rather a stepping stone toward eventual success.When you face challenges in your own life, remember Edison story. Embrace your failures as valuable lessons, and let them fuel your determination. With perseverance and a positive mindset, you too can turn obstacles into opportunities and achieve your dreams.Keep pushing forward, no matter how difficult the path may seem. Success often comes to those who refuse to give up. 🌟💪 ';
          }

          else if (post.id === 7) {
            title="Mughisa Fatima";
            customBody = 'Just wanted to say a big “Hello!” and see how everyone’s doing. If your day has been as productive as mine (i.e., spent more time debating whether to clean the house or take a nap), then we might be soulmates. 😂';
          }
          else if (post.id === 8) {
            title="Hoor Ain";
            customBody = '🌟 Success is not the key to happiness. Happiness is the key to success. If you love what you are doing, you will be successful. Albert Schweitzer Embrace our passions and find happiness in every step we take. Success will follow naturally. Keep doing what you love! 💖';
          }


          else if (post.id === 9) {
            title="  Sara Muhammad";
            imageUrl=" https://as1.ftcdn.net/v2/jpg/00/70/19/66/1000_F_70196688_o6LkNaO4A1pq7Qkhg0ci1Jv0yY0Srj9W.jpg ";
            
          }
         else if (post.id === 10) {
            title="Uniza Khan";
            imageUrl="  https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQo-EJS_64KTIu-jZCGFAsTHEDQrK5WAPluuw&s ";
            customBody = 'Life is a beautiful tapestry woven from moments of joy, challenges, and growth. It is easy to get caught up in the pursuit of our goals and forget to appreciate the present. Remember, life is not just about reaching the destination; it is about the journey we take to get there.Each day brings new opportunities and lessons. The highs make us appreciate the good times, and the lows teach us resilience and strength. Its important to find balance, embrace each experience, and live with intention.Instead of focusing solely on what lies ahead, take a moment to reflect on how far you have come. Celebrate your progress, no matter how small, and use it as fuel to keep moving forward. Life is a series of moments, and each one contributes to the person you are becoming.So, live passionately, cherish the little things, and never lose sight of your dreams. The journey is just as important as the destination. 🌈💪';
          }

          return {
            ...post,
            body:customBody,
            imageUrl: imageUrl,
            title:title,
          };
        });
        setPosts(prevPosts => [...prevPosts, ...postsWithImages]);
      } else {
        setHasMore(false);
      }
    } catch (error) {
      console.error('Error fetching posts:', error);
    }
  };



  const handleLike = (postId) => {
    setLikes(prevLikes => ({
      ...prevLikes,
      [postId]: (prevLikes[postId] || 0) + 1
    }));
  };




  const handleAddComment = (postId, commentText) => {
    const newComment = {
      id: Date.now(), // Or any unique ID generation method
      text: commentText
    };

    setComments(prevComments => ({
      ...prevComments,
      [postId]: [...(prevComments[postId] || []), newComment]
    }));
  };

  const handleEditComment = (postId, commentId, commentText) => {
    setEditingCommentId(commentId);
    setEditedCommentText(commentText);
    setCurrentPostId(postId);
  };

  const handleUpdateComment = () => {
    setComments(prevComments => ({
      ...prevComments,
      [currentPostId]: prevComments[currentPostId].map(comment => 
        comment.id === editingCommentId ? { ...comment, text: editedCommentText } : comment
      )
    }));
    setEditingCommentId(null);
    setEditedCommentText('');
    setCurrentPostId(null);
  };

  const handleDeleteComment = (postId, commentId) => {
    setComments(prevComments => ({
      ...prevComments,
      [postId]: prevComments[postId].filter(comment => comment.id !== commentId)
    }));
  };





  /*const handleAddComment = (postId, comment) => {
    setComments(prevComments => ({
      ...prevComments,
      [postId]: [...(prevComments[postId] || []), comment]
    }));
  };*/

  const handleScroll = useCallback(() => {
    if (window.innerHeight + document.documentElement.scrollTop !== document.documentElement.offsetHeight || !hasMore) return;
    setPage(prevPage => prevPage + 1);
  }, [hasMore]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);


  const handleNewPost = () => {
    const newPost = {
      id: posts.length + 1,
      title: 'New Post',
      body: newPostContent,
      userId: 1
    };
    setPosts([newPost, ...posts]);
    setNewPostContent('');
  };

  

  return (
    <div className="app">
      <header className="header">
        <img src="https://upload.wikimedia.org/wikipedia/commons/5/51/Facebook_f_logo_%282019%29.svg" alt="Facebook" className="facebook-icon" />
        <div>
          <input type="text" placeholder="Search" className="search-bar" />
        </div>
        <nav className="nav-icons">
          <i className="fas fa-home"></i>
          <i className="fas fa-user-friends"></i>
          <i className="fas fa-bell"></i>
          <i className="fas fa-store"></i>
          <i className="fas fa-bars"></i>


        </nav>
        <div className="messenger">
          <i className="fab fa-facebook-messenger"></i>
          Messenger</div>
       
      </header>

      <div className="stories">

<div className='side-and-story'>
<div className='sidebar'>

  <div className='my-profile'>
    <img src="  https://photosnow.org/wp-content/uploads/2024/04/41322a3eee0c8439f02f5bc477784631-1-e1713593269382.jpg  " alt='no' className='profile-pic'></img>
  <p className='profile-name'>Mahnoor Fatima</p>
  </div>

  <div className='favourite'>
<div className='favourites'><p>FAVOURITES</p></div>
<section>
<div className='allfavourites'>
<div className="first"><img src=" https://cdn-icons-png.flaticon.com/512/906/906338.png" alt="NO" width="35rem" height="38rem"/> <p>News Feed</p></div>
<div   className="second" ><img src=" https://images.vexels.com/media/users/3/223406/isolated/preview/cb0f43285fb4c97c7236772b17e6c268-star-icon-flat.png" alt="No" width="33rem" height="40rem"/>  <p>Events</p></div>
<div className="third" ><img src=" https://cdn-icons-png.flaticon.com/512/7420/7420730.png" alt="NO" width="32rem"  height="46rem"/> <p>Friend Requests</p></div>
<div className="fourth"  ><img src=" https://cdn-icons-png.flaticon.com/128/60/60781.png" alt="No" width="16rem" height="23rem"/><p>See more</p></div>
<div className='my-border'></div>
</div>
</section>
  </div>


  <div className='favourite'>
<div className='favourites'><p>APPS</p></div>
<section>
<div className='allfavourites'>
<div className="first"><img src=" https://static-00.iconduck.com/assets.00/apple-app-store-icon-512x474-ga5hok1b.png" alt="NO" width="30rem" height="30rem"/> <p>App Store</p></div>
<div   className="second" ><img src="https://i.pinimg.com/564x/cc/f0/47/ccf0476a7cde101f6a3e3ad3c3bad12e.jpg " alt="No" width="30rem" height="30rem"/>  <p>Photos</p></div>
<div className="third" ><img src=" https://icons.veryicon.com/png/o/miscellaneous/resume-breakpoint-simple-line-mark/music-435.png" alt="NO" width="30rem"/><p>Music</p></div>
<div className="fourth"  ><img src=" https://cdn.icon-icons.com/icons2/2760/PNG/512/note_list_notes_icon_176382.png" alt="No" width="35rem"/><p>Notes</p></div>
</div>
</section>
  </div>
  </div>

        <div className='story'>
        <div className='story1'>
          <img src="https://photosnow.org/wp-content/uploads/2024/04/41322a3eee0c8439f02f5bc477784631-1-e1713593269382.jpg" alt="Story 1" className="my-dp" />
          <button className="my-button">+</button>
          <p className='my-text'>Create Your Story</p>
        </div>
        <div className='story1'>
          <img src="https://i.pinimg.com/736x/9e/7b/a2/9e7ba2587246ce6a53b61da631f14264.jpg" alt="Story 1" className="story-dp-back" />
          <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTVKj7aCJ_NCifJDuiWLfN39K7JFRC4VzfsCQ&s" alt="Story 1" className="story-dp" />
          <p>Sidra</p>
        </div>
        <div className='story1'>
          <img src="https://i.pinimg.com/564x/bf/62/2e/bf622e6417004a47188eb11e19494f03.jpg" alt="Story 1" className="story-dp-back" />
          <img src="https://i.pravatar.cc/100?img=2" alt="Story 2" className="story-dp" />
          <p>Aliza</p>
        </div>
        <div className='story1'>
          <img src="https://i.pinimg.com/736x/81/1d/21/811d21f46c88732b60dadf6c5389e626.jpg" alt="Story 1" className="story-dp-back" />
          <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSQiIGu9RW6FD4lPe0obRvngJep0vVAEnsy1Q&s" alt="Story 3" className="story-dp" />
          <p>Anousha</p>
        </div>
        </div>
        <div className='sidebar'>
<div className='favourite'    style={{backgroundColor:'aliceblue',padding:'1rem'}} >
<div className='favourites'><p>CONTACTS</p></div>
<section>
<div className='allfavourites' >
<div className="first"><img src=" https://static.vecteezy.com/system/resources/thumbnails/024/489/979/small/beautiful-girl-ai-generated-free-photo.jpg" style={{borderRadius:'50%'}} alt="NO" width="47px" height="47px"  /><p>Ayesha</p></div>
<div   className="second" ><img src=" https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSji-adLepdnV3FkKy_axYPXlpeSNPgnn6bRg&s " alt="No" width="47px" height="47px"  style={{borderRadius:'50%'}}/><p>Sidra</p></div>
<div className="third" ><img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS9tu0c_cjxMIIll3_E23_TRiAGPLXAW5WJFg&s" alt="NO" width="47px" height="47px"  style={{borderRadius:'50%'}}/><p>Aqsa</p></div>
<div className="fourth"  ><img src=" https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTtC78nY09z06ZuBfvqucWQRlqzhvUnFg1KWg&s " alt="No" width="47px" height="47px"  style={{borderRadius:'50%'}}/><p>Fatima</p></div>
<div className="first"><img src=" https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS_cVol6_jTf3_skb1ZQSveE63vQSTd6cvA9A&s" style={{borderRadius:'50%'}} alt="NO" width="47px" height="47px"/><p>Ayesha</p></div>
<div   className="second" ><img src=" https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRtF1Gz_Xsh2r_DfO5JaLspe4oKYcEGo-myBg&s " alt="No" width="47px" height="47px" style={{borderRadius:'50%'}}/><p>Manahil</p></div>
<div className="third" ><img src="https://i.pinimg.com/originals/20/d8/3a/20d83a69642f0975d1a1cbfd57f181bb.jpg" alt="NO" width="47px" height="47px"   style={{borderRadius:'50%'}}/><p>Mahnoor Fatima</p></div>
<div className="fourth"  ><img src="https://marketplace.canva.com/EAFy6BtAOFA/1/0/1600w/canva-gold-black-modern-facebook-profile-picture-h0V1KbGIHbQ.jpg " alt="No" width="47px" height="47px" style={{borderRadius:'50%'}}/><p>Anam</p></div>
</div>
</section>
</div>
</div>
      </div>
      </div>


      <div className="feed">
        <div className="create-post">
          <div className="input-container1">
            <img src="https://photosnow.org/wp-content/uploads/2024/04/41322a3eee0c8439f02f5bc477784631-1-e1713593269382.jpg" alt="User" className="profile-pic" />
            <textarea
              value={newPostContent}
              onChange={(e) => setNewPostContent(e.target.value)}
              placeholder="What's on your mind?"
            />
          </div>
          
          <button  onClick={handleNewPost}>Post</button>
        </div>
        
        {posts.map(post => (
          <div key={post.id} className="post">
            <div className="post-header">
              <img src={`https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTn6rBg9sCWSxqgocT0s05JePSm3w5hceS0EA&s${post.userId}`} alt="User avatar" />
              <div>
                <h3>{post.title}</h3>
                <small>Posted by User {post.userId}</small>
              </div>
            </div>
            <div className="post-content">

              <p>{post.body}</p>
              {post.imageUrl && <img src={post.imageUrl} alt="post" className='post-image' width={1050}   height={400}/>}
            </div>
            <div className="post-actions">
              <button onClick={() => handleLike(post.id)}>
                Like {likes[post.id] || 0}
              </button>
              <button onClick={() => handleAddComment(post.id, 'Nice post!')}>
                Comment
              </button>
            </div>
            
           
            <div className="comments">
  {(comments[post.id] || []).map((comment, index) => (
    <div key={index} className="comment">
      {editingCommentId === comment.id ? (
        <div>
          <textarea
            value={editedCommentText}
            onChange={(e) => setEditedCommentText(e.target.value)}
          />
          <button onClick={() => handleUpdateComment(post.id)}>Update</button>
          <button onClick={() => setEditingCommentId(null)}>Cancel</button>
        </div>
      ) : (
        <div>
          <p>{comment.text}</p>
          <button onClick={() => handleEditComment(post.id, comment.id, comment.text)}>Edit</button>
          <button onClick={() => handleDeleteComment(post.id, comment.id)}>Delete</button>
        </div>
      )}
    </div>
  ))}
</div>


          </div>
        ))}
        {!hasMore && <p>Loading......</p>}
      </div>
    </div>
    
  );
};

export default App;