import React, { useEffect, useRef } from 'react';
import style from '/styles/Home.module.scss';

export default function Sidebar({ theWheel, segments, setSegments }) {
  const segmentRef = useRef();

  useEffect(() => {
    if (theWheel?.segments) {
      setSegments([...theWheel.segments]);
    }
  }, [theWheel?.segments]);

  const randomFillStyle = () => {
    const colorArray = ['#005f73', '#0a9396', '#94d2bd', '#e9d8a6', '#ee9b00', '#ca6702', '#bb3e03', '#ae2012', '#9b2226'];
    return colorArray[(Math.random() * colorArray.length) | 0];
  };

  const addSegment = (e) => {
    e.preventDefault();
    if (!segmentRef.current.value) return;

    const newSegment = {
      text: segmentRef.current.value,
      fillStyle: randomFillStyle()
    };

    theWheel.addSegment(newSegment);
    if (!localStorage.getItem('segments')) theWheel.deleteSegment(0);
    theWheel.draw();

    setSegments([...theWheel.segments]);
    localStorage.setItem('segments', JSON.stringify(theWheel.segments));

    segmentRef.current.value = '';
  };
  const deleteSegment = (i) => {
    theWheel.deleteSegment(i);
    theWheel.draw();

    setSegments([...theWheel.segments]);
    localStorage.setItem('segments', JSON.stringify(theWheel.segments));
  };

  return (
    <div
      id='sidebarWrapper'
      className='container'
      style={{
        minWidth: '250px',
        height: 'calc(100% - 20px)',
        backgroundColor: '#fef6c9',
        paddingBottom: '20px',
        borderRadius: '35px',
        margin: '10px 0',
        boxShadow: '0 0 25px 0px #e2daad'
      }}
    >
      <h5 className='pt-3 text-center'>My favorites</h5>
      <ul className='pb-3' style={{ padding: 0 }}>
        {segments?.map((segment, i) => {
          if (!segment?.text) return null;
          return (
            <li
              key={i}
              style={{
                display: 'flex',
                justifyContent: 'space-between'
              }}
            >
              {segment.text}
              {theWheel?.segments?.filter((s) => s).length > 1 ? (
                <span onClick={() => deleteSegment(i)} className={style.removeButton}>
                  <i className='bi bi-trash-fill'></i>
                </span>
              ) : null}
            </li>
          );
        })}
      </ul>

      <div className='row'>
        <div className='col'>
          <form onSubmit={addSegment}>
            <div className='input-group mb-3'>
              <input
                type='text'
                className='form-control'
                placeholder='More food..'
                aria-label='Username'
                aria-describedby='basic-addon1'
                ref={segmentRef}
              />
              <button type='submit' className='input-group-text'>
                Add
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
