#!/bin/bash

# Fix all API route files that are missing session variable declaration

# List of files that need fixing
files=(
    "app/api/services/route.ts"
    "app/api/pages/route.ts"
    "app/api/pricing/route.ts"
    "app/api/reviews/route.ts"
    "app/api/upload/route.ts"
    "app/api/services/[id]/route.ts"
    "app/api/services/[id]/offers/route.ts"
    "app/api/services/[id]/subservices/route.ts"
    "app/api/pages/[id]/route.ts"
    "app/api/reviews/[id]/route.ts"
    "app/api/pricing/[id]/route.ts"
)

for file in "${files[@]}"; do
    if [ -f "$file" ]; then
        echo "Fixing $file..."
        # Add session declaration before each "if (!session)" check
        # Only if it's not already there
        sed -i '/if (!session)/i\        const session = await getServerSession();' "$file"
        # Remove duplicate session declarations
        awk '!seen[$0]++' "$file" > "$file.tmp" && mv "$file.tmp" "$file"
    fi
done

echo "All files fixed!"
