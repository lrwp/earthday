build:
	rm -rf build
	cp -r src build

	# Index
	cat build/header.html > build/index.html
	cat build/index.content.html >> build/index.html
	cat build/footer.html >> build/index.html

	# Event
	cat build/header.html > build/event.html
	cat build/event.content.html >> build/event.html
	cat build/footer.html >> build/event.html

	# Sponsors 
	cat build/header.html > build/sponsors.html
	cat build/sponsors.content.html >> build/sponsors.html
	cat build/footer.html >> build/sponsors.html

	# Contact	
	cat build/header.html > build/contact.html
	cat build/contact.content.html >> build/contact.html
	cat build/footer.html >> build/contact.html

	rm build/*.content.html
	rm build/header.html
	rm build/footer.html

	# Minify templates
	for h in build/*.html; do \
		echo "Minifying: $$h"; \
		java -jar util/htmlcompressor-1.5.3.jar --remove-surrounding-spaces all --type html -o "$$h" "$$h"; \
	done

	# Minify Javascript
	for j in build/js/*.js; do \
		echo "Compressing: $$j"; \
		java -jar util/compiler.jar --warning_level QUIET --compilation_level SIMPLE_OPTIMIZATIONS --js_output_file "$$j.out" "$$j"; \
		mv "$$j.out" "$$j"; \
	done

	# Minify Css
	for c in build/css/*.css; do \
		echo "Minifying $$c"; \
		java -jar util/yuicompressor-2.4.8pre.jar --type css -o "$$c.out" "$$c"; \
		mv "$$c.out" "$$c"; \
	done

	# Optimize JPEGs
	for j in $$(find build/ -name "*.jpg" -or -name "*.jpeg"); do \
		echo "Optimizing $$j"; \
		before=`wc -c < "$$j"`; \
		jpegtran -progressive -copy none -optimize "$$j"  > "$$j.out"; \
		after=`wc -c < "$$j.out"`; \
		if [ "$$before" -gt "$$after" ]; \
		then \
			mv "$$j.out" "$$j"; \
		else \
			echo "No savings: $$j"; \
			rm "$$j.out"; \
		fi \
	done

	# Crush PNGs
	for p in $$(find build/ -name "*.png" ); do \
		echo "Crushing $$p"; \
		before=`wc -c < "$$p"`; \
		pngcrush -q -rem allb -brute -reduce "$$p" "$$p.out"; \
		after=`wc -c < "$$p.out"`; \
		if [ "$$before" -gt "$$after" ]; \
		then \
			mv "$$p.out" "$$p"; \
		else \
			echo "No savings: $$p"; \
			rm "$$p.out"; \
		fi \
	done

lint:

	# Lint JavaScript
	for j in src/_attachments/js/*.js; do \
		echo "Linting $$j"; \
		node_modules/.bin/jslint --nomen --predef "$$" --browser "$$j"; \
	done

clean:
	rm -rf build
