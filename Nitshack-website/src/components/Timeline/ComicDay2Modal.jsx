import React from 'react';
import ComicDayModal from './ComicDayModal';
import popupFrameImg from "../../assets/popup_day2_transparent.png";

/**
 * Day 2 (Thanos) comic popup.
 * PREVIOUS -> back to Ultron (Day 1), NEXT -> on to Doctor Doom (Day 3).
 */
const CONFIG = {
  frameImg: popupFrameImg,
  alt: 'Day 2 - Thanos Timeline',
  visibleButtons: true,
  hideText: true,
  width: 1836,
  height: 1826,
  cropHeight: 1020, // artwork ends ~1020px down; the rest of the PNG is empty
  title: { text: 'DAY 2', x: 690, y: 122, size: 62 },
  body: {
    x: 690,
    y: 192,
    size: 33,
    lineHeight: 42,
    lines: [
      'Explore our coding track to',
      'build your programming skills',
      'from the ground up. Whether',
      "you're a beginner or looking",
      'to sharpen your expertise,',
      'this track offers hands-on',
      'projects and expert guidance',
      'to help you succeed.',
    ],
  },
  prev: {
    left: '4.1%',
    top: '85.1%',
    width: '15.6%',
    height: '9.8%',
    rotate: 0,
    label: 'Previous: Back to Ultron (Day 1)',
  },
  next: {
    left: '89%',
    top: '85.4%',
    width: '10.6%',
    height: '9.6%',
    rotate: 0,
    label: 'Next: Fly to Doctor Doom (Day 3)',
  },
};

export default function ComicDay2Modal(props) {
  return <ComicDayModal {...props} config={CONFIG} />;
}