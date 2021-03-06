import { Composite, ImageView, Properties, TextView } from 'tabris';
import { ComponentJSX, component, getById, inject } from 'tabris-decorators';
import { ExampleGalleryEntry, Example } from '../model/ExampleGallery';
import { Colors } from '../res/Colors';
import { Images } from '../res/Images';
import { Fonts } from '../res/Fonts';
import { Texts } from '../res/Texts';
import ExampleView, { launchExample, showExampleSource } from './ExampleView';
import ActionIcon from './ActionIcon';
import LinkView from './LinkView';
import Divider from './Divider';
import dimen from '../res/dimen';

@component export default class ExampleViewAdvanced extends ExampleView {

  public jsxProperties: ComponentJSX<this>;
  @getById private name: TextView;
  @getById private image: ImageView;
  @getById private description: TextView;
  @getById private linkView: LinkView;
  private example: Example;

  constructor(
    properties: Properties<Composite>,
    @inject protected readonly colors: Colors,
    @inject protected readonly images: Images,
    @inject protected readonly fonts: Fonts,
    @inject protected readonly texts: Texts) {
    super({
      background: colors.surface,
      elevation: 4,
      cornerRadius: dimen.isSmallDevice() ? 0 : dimen.cardCornerRadius,
      padding: { bottom: dimen.xs },
      ...properties
    });
    this.on({ tap: () => launchExample(this.example.runPath) });
    this.createUi();
  }

  public update(galleryEntry: ExampleGalleryEntry) {
    this.example = galleryEntry.example;
    this.name.text = galleryEntry.name;
    this.image.image = { src: 'example-gallery/' + galleryEntry.image, scale: 5 };
    this.description.text = galleryEntry.description;
    this.linkView.title = this.texts.showSourceCode;
  }

  private createUi() {
    this.append(
      <widgetCollection>
        <ActionIcon
          id='docsLink'
          right={dimen.xxs} top={dimen.xxs}
          image={this.images.docsLink}
          highlightOnTouch={false} />,
        <textView
          id='name'
          left={dimen.m} top={dimen.m} right={dimen.pxxs}
          font={this.fonts.h5}
          maxLines={1}
          textColor={this.colors.onSurface} />,
        <textView
          id='description'
          left={dimen.m} top={dimen.pxxs} right={dimen.m}
          maxLines={3}
          textColor={this.colors.onSurfaceMedium}
          lineSpacing={1.1}
          font={this.fonts.body1} />,
        <imageView
          id='image'
          top={dimen.ps} centerX={0} />,
        <Divider
          id='divider'
          left={0} top={dimen.ps} right={0}
          background={this.colors.onSurfaceDivider} />
        <LinkView
          id='linkView'
          left={0} top={dimen.pxs} right={0}
          onTap={() => showExampleSource(this.example.sourcePath)} />
      </widgetCollection>
    );
  }

}
