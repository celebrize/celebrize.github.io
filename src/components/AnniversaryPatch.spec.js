import React from 'react';
import { render } from '@testing-library/react';
import AnniversaryPatch from './AnniversaryPatch';
import NumberPeriodAnniversary from '../domain/anniversary/number_period_anniversary'
import GeneratedNumber from '../domain/generated_number'
import GeneratedPeriod from '../domain/generated_period'

describe("past label", () => {
    test('show "past" if birthday was yesterday', () => {
        const now = new Date('2020-01-02 12:00:00') // local time
        const anniversary = new NumberPeriodAnniversary(new GeneratedNumber(42), new GeneratedPeriod(new Date("2020-01-01 01:00:00")))
        const root = document.createElement('div')
        const { getByText } = render(<AnniversaryPatch now={now} anniversary={anniversary} />, {
            container: document.body.appendChild(root)
        });
        expect(getByText('Past')).toBeInTheDocument()
    })
})

describe("today label", () => {
    test('show "today" if birthday was earlier today', () => {
        const now = new Date('2020-01-01 12:00:00') // local time
        const anniversary = new NumberPeriodAnniversary(new GeneratedNumber(42), new GeneratedPeriod(new Date("2020-01-01 18:00:00")))
        const root = document.createElement('div')
        const { getByText } = render(<AnniversaryPatch now={now} anniversary={anniversary} />, {
            container: document.body.appendChild(root)
        });
        expect(getByText('Today')).toBeInTheDocument()
    })
    test('show "today" if birthday is later today', () => {
        const now = new Date('2020-01-01 12:00:00') // local time
        const anniversary = new NumberPeriodAnniversary(new GeneratedNumber(42), new GeneratedPeriod(new Date("2020-01-01 06:00:00")))
        const root = document.createElement('div')
        const { getByText } = render(<AnniversaryPatch now={now} anniversary={anniversary} />, {
            container: document.body.appendChild(root)
        });
        expect(getByText('Today')).toBeInTheDocument()
    })
})