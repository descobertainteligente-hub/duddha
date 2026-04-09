import { execSync } from 'child_process';

try {
  console.log('Adding all changes...');
  execSync('git add -A', { stdio: 'inherit' });
  
  console.log('Committing changes...');
  execSync('git commit -m "feat: convert HTML portfolio to Next.js application"', { stdio: 'inherit' });
  
  console.log('Pushing to repository...');
  execSync('git push origin HEAD', { stdio: 'inherit' });
  
  console.log('Successfully deployed! Your changes are pushed to the repository.');
} catch (error) {
  console.error('Error during commit/push:', error.message);
  process.exit(1);
}
