app /

1. (marketting) layout.tsx , page.tsx
2. (dashboard) layout.tsx , page.tsx

components/

- layout/
  - navbar.tsx
  - footer.tsx
- ui/
  - buttons, inputs(base components)

10 May ->

1. make useRef who store reference of input who's type is file
2. button execture inputhtmlEleement .current?.click() open window for selecting file
3. input on onChange event it calles a function when it's value chagnes in function it does
   1. e . target.file[0] -> first file
   2. call to the getSignedUrl with file data {name, type, size}
   3. as it got signed url call to upload func
4. for uplaod if url generated from PutOBjectCommand then only valid for PUT(uplaod) rather than POST
5. must send to S3 a header "Content-Type" : file.type
6. if cors error then allow from s3->permissions->cors

11-May decision ->

I am holding this probject untill i don't build Dentist Site and Portoflio Updates.

current state -> Dashboard.tsx making function call to fetch the files metadata, make frontend ui

1. send metadata to frontend
2. on frontend make ui by showing all this data along delete, open, edit btn's
3. make the backend routes for delete, edit
4. when open/view send preSignedURl to open
