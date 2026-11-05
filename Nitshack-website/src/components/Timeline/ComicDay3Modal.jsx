import React from 'react';
import ComicDayModal from './ComicDayModal';
import popupFrameImg from "../../assets/popup_day3_transparent.png";
/**
 * Day 3 (Doctor Doom) comic popup.
 * PREVIOUS -> back to Thanos (Day 2). NEXT is disabled (last day).
 */
const CONFIG = {
  frameImg: popupFrameImg,
  alt: 'Day 3 - Doctor Doom Timeline',
  visibleButtons: true,
  hideText: true,
  width: 1920,
  height: 1357,
  title: { text: 'DAY 3', x: 1153, y: 292, size: 56 },
  body: {
    x: 1153,
    y: 352,
    size: 27,
    lineHeight: 35,
    lines: [
      'Explore our coding track to build',
      'your programming skills from the',
      "ground up. Whether you're a",
      'beginner or looking to sharpen your',
      'expertise, this track offers hands-',
      'on projects and expert guidance to',
      'help you succeed.',
    ],
  },
  prev: {
    left: '4.3%',
    top: '75.3%',
    width: '14.8%',
    height: '7.3%',
    rotate: 0,
    label: 'Previous: Back to Thanos (Day 2)',
  },
  next: {
    left: '83%',
    top: '75.5%',
    width: '10.2%',
    height: '7.3%',
    rotate: 0,
    disabled: true,
    label: 'No next day (Day 3)',
  },
};

export default function ComicDay3Modal(props) {
  return <ComicDayModal {...props} config={CONFIG} />;
}