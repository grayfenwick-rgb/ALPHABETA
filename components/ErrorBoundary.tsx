'use client';
import React from 'react';

type boundary_state = { has_error: boolean; message?: string };

export default class ErrorBoundary extends React.Component<React.PropsWithChildren, boundary_state> {
  state: boundary_state = { has_error: false };
  static getDerivedStateFromError(err: any) { return { has_error: true, message: String(err) }; }
  componentDidCatch(err: any, info: any) { console.error('boundary', err, info); }
  render() { return this.state.has_error ? <div style={{padding:12,color:'#e7e9f2'}}>Error: {this.state.message}</div> : this.props.children; }
}
