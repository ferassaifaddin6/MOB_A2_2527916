import React from 'react';
import { Body, Card, Screen } from '../ui';
import { STUDENT } from '../data';

export default function About() {
  return (
    <Screen>
      <Card title="About this app">
        <Body>App name: {STUDENT.appName}</Body>
        <Body>Student: {STUDENT.fullName}</Body>
        <Body>Registration number: {STUDENT.regNo}</Body>
        <Body>Verification code: {STUDENT.code}</Body>
        <Body>Version: {STUDENT.version}</Body>
      </Card>
      <Card title="Data use">
        <Body>Your profile text and photo are saved only on this device. Nothing is sent online and no account or password is used.</Body>
        <Body muted>The app works fully offline. It has no features that need a connection.</Body>
      </Card>
    </Screen>
  );
}
