const validator = require('validator');
const sanitizeHtml = require('sanitize-html');

// Validate the title
if (!validator.isLength(title, { min: 1, max: 100 })) {
 throw new Error('Title must be between 1 and 100 characters');
}

// Validate the content
if (!validator.isLength(content, { min: 1, max: 5000 })) {
 throw new Error('Content must be between 1 and 5000 characters');
}

// Validate the author
if (!validator.isLength(author, { min: 1, max: 50 })) {
 throw new Error('Author must be between 1 and 50 characters');
}

// Sanitize the title, content, and author to remove or escape potentially harmful characters
const sanitizedTitle = sanitizeHtml(title, {
 allowedTags: [],
 allowedAttributes: {}
});

const sanitizedContent = sanitizeHtml(content, {
 allowedTags: [],
 allowedAttributes: {}
});

const sanitizedAuthor = sanitizeHtml(author, {
 allowedTags: [],
 allowedAttributes: {}
});