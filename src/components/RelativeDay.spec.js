import React from 'react';
import { render } from '@testing-library/react';
import RelativeDay from './RelativeDay';

test('\"tomorrow\" is independent of time', () => {
  for (let i=0; i<24; i++) {
    const now = new Date('2020-01-01 00:00:00') // local time
    now.setHours(i)
    for (let j=0; j<24; j++) {
      const date = new Date('2020-01-02 00:00:00') // local time
      date.setHours(j)

      // create a custom root, so not all elements are appended to the document
      const root = document.createElement('div')
      const { getByText } = render(<RelativeDay now={now} day={date} />, {
        container: document.body.appendChild(root)
      });
      expect(getByText('Tomorrow')).toBeInTheDocument()
    }
  }
})

test('\"yesterday\" is independent of time', () => {
  for (let i=0; i<24; i++) {
    const now = new Date('2020-01-01 00:00:00') // local time
    now.setHours(i)
    for (let j=0; j<24; j++) {
      const date = new Date('2019-12-31 00:00:00') // local time
      date.setHours(j)

      // create a custom root, so not all elements are appended to the document
      const root = document.createElement('div')
      const { getByText } = render(<RelativeDay now={now} day={date} />, {
        container: document.body.appendChild(root)
      });
      expect(getByText('Yesterday')).toBeInTheDocument()
    }
  }
})

test('\"Saturday\" is independent of time', () => {
  for (let i=0; i<24; i++) {
    const now = new Date('2020-01-01 00:00:00') // local time
    now.setHours(i)
    for (let j=0; j<24; j++) {
      const date = new Date('2020-01-04 00:00:00') // local time
      date.setHours(j)

      // create a custom root, so not all elements are appended to the document
      const root = document.createElement('div')
      const { getByText } = render(<RelativeDay now={now} day={date} />, {
        container: document.body.appendChild(root)
      });
      expect(getByText('Saturday')).toBeInTheDocument()
    }
  }
})
