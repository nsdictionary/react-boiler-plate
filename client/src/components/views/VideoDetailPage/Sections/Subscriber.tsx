import React, {useEffect, useState} from "react";
import axios from "axios";

const Subscriber = (props: any) => {
  const userTo = props.userTo
  const userFrom = props.userFrom

  const [SubscribeNumber, setSubscribeNumber] = useState(0)
  const [Subscribed, setSubscribed] = useState(false)

  const onSubscribe = () => {
    const subscribeVariables = {
      userTo: userTo,
      userFrom: userFrom
    }

    if (Subscribed) {
      //when we are already subscribed
      axios.post('/api/subscribe/unSubscribe', subscribeVariables)
        .then(res => {
          if (res.data?.ok) {
            setSubscribeNumber(SubscribeNumber - 1)
            setSubscribed(!Subscribed)
          } else {
            alert('Failed to unsubscribe')
          }
        })
    } else {
      // when we are not subscribed yet
      axios.post('/api/subscribe/subscribe', subscribeVariables)
        .then(res => {
          if (res.data?.ok) {
            setSubscribeNumber(SubscribeNumber + 1)
            setSubscribed(!Subscribed)
          } else {
            alert('Failed to subscribe')
          }
        })
    }
  };

  useEffect(() => {
    const subscribeNumberVariables = {userTo: userTo, userFrom: userFrom}
    axios.post('/api/subscribe/subscribeNumber', subscribeNumberVariables)
      .then(res => {
        if (res.data?.ok) {
          setSubscribeNumber(res.data.subscribeNumber)
        } else {
          alert('Failed to get subscriber Number')
        }
      })

    axios.post('/api/subscribe/subscribed', subscribeNumberVariables)
      .then(res => {
        if (res.data?.ok) {
          setSubscribed(res.data.subscribed)
        } else {
          alert('Failed to get Subscribed Information')
        }
      })
  }, [userFrom, userTo])

  return (
    <div>
      <button
        onClick={onSubscribe}
        style={{
          backgroundColor: `${Subscribed ? '#AAAAAA' : '#CC0000'}`,
          outline: 0,
          border: 0,
          borderRadius: '4px',
          color: 'white',
          padding: '10px 16px',
          fontWeight: 500,
          fontSize: '1rem',
          textTransform: 'uppercase'
        }}>
        {SubscribeNumber} {Subscribed ? 'Subscribed' : 'Subscribe'}
      </button>
    </div>
  )
};

export default Subscriber;
