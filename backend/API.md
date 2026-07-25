# FormFlow Backend API

## GET /api/health
Returns `{ "status": "ok" }`

## GET /api/forms
Returns all forms.

## POST /api/forms
Body: `{ "title": string, "fields": string[] }`
Returns the created form (201).

## GET /api/forms/:id
Returns a single form or 404 if not found.

## PUT /api/forms/:id
Updates a form. Returns the updated form or 404.

## DELETE /api/forms/:id
Deletes a form. Returns 204 on success, 404 if not found.