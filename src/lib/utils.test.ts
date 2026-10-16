// src/lib/utils.test.ts
import { describe, expect, it } from 'vitest'
import { cn } from './utils'

describe('cn', () => {
  it('merges conflicting Tailwind classes, last one wins', () => {
    expect(cn('p-2', 'p-4')).toBe('p-4')
  })
  it('drops falsy values', () => {
    expect(cn('a', false && 'b', undefined, 'c')).toBe('a c')
  })
})
