// Import React dependencies.
import React, { useMemo, useState } from 'react'
// Import the Slate editor factory.
import { createEditor, Node } from 'slate'

// Import the Slate components and React plugin.
import { Slate, Editable, withReact } from 'slate-react'

const initialState: Node[] = [
  {
    type: 'paragraph',
    children: [{ text: 'A line of text in a paragraph.' }]
  }
]

export const StoryEditor = (): JSX.Element => {
  const editor = useMemo(() => withReact(createEditor()), [])
  const [value, setValue] = useState(initialState)

  return (
    <Slate editor={editor} value={value} onChange={(value): void => setValue(value)}>
      <Editable
        onKeyDown={(event): void => {
          console.log(event.key)
          if (event.key === '&') {
            // Prevent the ampersand character from being inserted.
            event.preventDefault()
            // Execute the `insertText` method when the event occurs.
            editor.insertText('and')
          }
        }}
      />
    </Slate>
  )
}
