#!/bin/bash

# This script helps add last_updated field to posts that don't have it yet
# It uses the file's last modification time as a default

POSTS_DIR="_posts"
POST_FILES=$(find "$POSTS_DIR" -name "*.md")

for file in $POST_FILES; do
  # Check if the file already has last_updated field
  if ! grep -q "^last_updated:" "$file"; then
    echo "Processing: $file"
    
    # Get the last modification time of the file
    last_modified=$(date -r "$file" "+%Y-%m-%d")
    
    # Get the post title for reference
    title=$(grep -n "^title:" "$file" | head -1 | sed 's/.*title: //')
    
    echo "Title: $title"
    echo "Last modified date from file: $last_modified"
    echo ""
    
    read -p "Use this date as last_updated? (y/n/custom date YYYY-MM-DD): " response
    
    if [[ "$response" == "y" ]]; then
      update_date=$last_modified
    elif [[ "$response" =~ ^[0-9]{4}-[0-9]{2}-[0-9]{2}$ ]]; then
      update_date=$response
    else
      echo "Skipping this file."
      continue
    fi
    
    if [ -n "$update_date" ]; then
      # Insert the last_updated field after the tags line
      sed -i "/^tags:/a last_updated: $update_date" "$file"
      echo "Added last_updated: $update_date to $file"
    fi
  else
    echo "File $file already has last_updated field, skipping..."
  fi
done

echo "Done processing all posts!"
